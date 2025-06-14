-- 安全更新数据库表以适配 Better Auth
-- Better Auth 使用 'user' 表而不是 'auth.users'

-- 1. 删除现有的外键约束（如果存在）
DO $$ 
BEGIN
    -- 删除 payments 表的外键约束
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'payments_user_id_fkey' 
               AND table_name = 'payments') THEN
        ALTER TABLE payments DROP CONSTRAINT payments_user_id_fkey;
    END IF;
    
    -- 删除 user_stripe_customers 表的外键约束
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'user_stripe_customers_user_id_fkey' 
               AND table_name = 'user_stripe_customers') THEN
        ALTER TABLE user_stripe_customers DROP CONSTRAINT user_stripe_customers_user_id_fkey;
    END IF;
    
    -- 删除 subscriptions 表的外键约束
    IF EXISTS (SELECT 1 FROM information_schema.table_constraints 
               WHERE constraint_name = 'subscriptions_user_id_fkey' 
               AND table_name = 'subscriptions') THEN
        ALTER TABLE subscriptions DROP CONSTRAINT subscriptions_user_id_fkey;
    END IF;
END $$;

-- 2. 删除现有的 RLS 策略（如果存在）
DROP POLICY IF EXISTS "Users can view their own payments" ON payments;
DROP POLICY IF EXISTS "Users can view their own stripe customer info" ON user_stripe_customers;
DROP POLICY IF EXISTS "Users can view their own subscriptions" ON subscriptions;
DROP POLICY IF EXISTS "Service role can manage payments" ON payments;
DROP POLICY IF EXISTS "Service role can manage user stripe customers" ON user_stripe_customers;
DROP POLICY IF EXISTS "Service role can manage subscriptions" ON subscriptions;

-- 3. 禁用 RLS（Better Auth 不使用 Supabase 的 RLS）
DO $$
BEGIN
    -- 检查表是否存在再禁用 RLS
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payments') THEN
        ALTER TABLE payments DISABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_stripe_customers') THEN
        ALTER TABLE user_stripe_customers DISABLE ROW LEVEL SECURITY;
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'subscriptions') THEN
        ALTER TABLE subscriptions DISABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- 4. 修改列类型以匹配 Better Auth 的 user 表 ID 类型
DO $$
BEGIN
    -- 修改 payments 表的 user_id 列类型
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'payments' AND column_name = 'user_id') THEN
        ALTER TABLE payments ALTER COLUMN user_id TYPE TEXT;
    END IF;
    
    -- 修改 user_stripe_customers 表的 user_id 列类型
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'user_stripe_customers' AND column_name = 'user_id') THEN
        ALTER TABLE user_stripe_customers ALTER COLUMN user_id TYPE TEXT;
    END IF;
    
    -- 修改 subscriptions 表的 user_id 列类型
    IF EXISTS (SELECT 1 FROM information_schema.columns 
               WHERE table_name = 'subscriptions' AND column_name = 'user_id') THEN
        ALTER TABLE subscriptions ALTER COLUMN user_id TYPE TEXT;
    END IF;
END $$;

-- 5. 添加新的外键约束（如果表存在且 Better Auth 的 user 表存在）
DO $$
BEGIN
    -- 检查 user 表是否存在
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user') THEN
        
        -- 为 payments 表添加外键约束
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payments') THEN
            ALTER TABLE payments 
            ADD CONSTRAINT payments_user_id_fkey 
            FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;
        END IF;
        
        -- 为 user_stripe_customers 表添加外键约束
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_stripe_customers') THEN
            ALTER TABLE user_stripe_customers 
            ADD CONSTRAINT user_stripe_customers_user_id_fkey 
            FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;
        END IF;
        
        -- 为 subscriptions 表添加外键约束
        IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'subscriptions') THEN
            ALTER TABLE subscriptions 
            ADD CONSTRAINT subscriptions_user_id_fkey 
            FOREIGN KEY (user_id) REFERENCES "user"(id) ON DELETE CASCADE;
        END IF;
        
    ELSE
        RAISE NOTICE 'Better Auth user table not found. Please ensure Better Auth tables are created first.';
    END IF;
END $$;

-- 6. 添加唯一约束（如果不存在）
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_stripe_customers') THEN
        -- 检查唯一约束是否已存在
        IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints 
                       WHERE constraint_name = 'user_stripe_customers_user_id_unique' 
                       AND table_name = 'user_stripe_customers') THEN
            ALTER TABLE user_stripe_customers 
            ADD CONSTRAINT user_stripe_customers_user_id_unique UNIQUE (user_id);
        END IF;
    END IF;
END $$;

-- 7. 安全地重建索引
DROP INDEX IF EXISTS idx_payments_user_id;
DROP INDEX IF EXISTS idx_user_stripe_customers_user_id;
DROP INDEX IF EXISTS idx_subscriptions_user_id;

-- 创建新索引（如果不存在）
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_user_stripe_customers_user_id ON user_stripe_customers(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);

-- 8. 添加注释说明
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'payments') THEN
        COMMENT ON TABLE payments IS 'Payment records for Better Auth users';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_stripe_customers') THEN
        COMMENT ON TABLE user_stripe_customers IS 'Stripe customer mapping for Better Auth users';
    END IF;
    
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'subscriptions') THEN
        COMMENT ON TABLE subscriptions IS 'Subscription records for Better Auth users';
    END IF;
END $$;

-- 9. 验证迁移结果
DO $$
BEGIN
    RAISE NOTICE '=== Better Auth 迁移完成 ===';
    RAISE NOTICE '请验证以下内容：';
    RAISE NOTICE '1. Better Auth user 表是否存在';
    RAISE NOTICE '2. 支付相关表的外键是否正确指向 user 表';
    RAISE NOTICE '3. 应用程序是否能正常访问用户数据';
END $$; 