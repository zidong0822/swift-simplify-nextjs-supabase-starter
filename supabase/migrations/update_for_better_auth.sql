-- 更新数据库表以适配 Better Auth
-- Better Auth 使用 'user' 表而不是 'auth.users'

-- 1. 删除现有的外键约束
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_user_id_fkey;
ALTER TABLE user_stripe_customers DROP CONSTRAINT IF EXISTS user_stripe_customers_user_id_fkey;
ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_user_id_fkey;

-- 2. 删除现有的 RLS 策略
DROP POLICY IF EXISTS "Users can view their own payments" ON payments;
DROP POLICY IF EXISTS "Users can view their own stripe customer info" ON user_stripe_customers;
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Service role can manage payments" ON payments;
DROP POLICY IF EXISTS "Service role can manage user stripe customers" ON user_stripe_customers;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON subscriptions;

-- 3. 禁用 RLS（Better Auth 不使用 Supabase 的 RLS）
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
ALTER TABLE user_stripe_customers DISABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions DISABLE ROW LEVEL SECURITY;

-- 4. 添加新的外键约束，引用 Better Auth 的 user 表
-- 注意：Better Auth 的 user 表 ID 字段类型为 string，需要修改列类型
ALTER TABLE payments ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE user_stripe_customers ALTER COLUMN user_id TYPE TEXT;
ALTER TABLE subscriptions ALTER COLUMN user_id TYPE TEXT;

-- 5. 添加新的外键约束
ALTER TABLE payments 
ADD CONSTRAINT payments_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;

ALTER TABLE user_stripe_customers 
ADD CONSTRAINT user_stripe_customers_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;

ALTER TABLE subscriptions 
ADD CONSTRAINT subscriptions_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;

-- 6. 确保 user_stripe_customers 的 user_id 唯一约束
ALTER TABLE user_stripe_customers 
ADD CONSTRAINT user_stripe_customers_user_id_unique UNIQUE (user_id);

-- 7. 更新索引（如果需要）
DROP INDEX IF EXISTS idx_payments_user_id;
DROP INDEX IF EXISTS idx_user_stripe_customers_user_id;
DROP INDEX IF EXISTS idx_subscriptions_user_id;

CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stripe_customers_user_id ON user_stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);

-- 8. 添加注释说明
COMMENT ON TABLE payments IS 'Payment records for Better Auth users';
COMMENT ON TABLE user_stripe_customers IS 'Stripe customer mapping for Better Auth users';
COMMENT ON TABLE subscriptions IS 'Subscription records for Better Auth users'; 