-- Create docker_kubernetes_payments table for Docker & Kubernetes bootcamp
CREATE TABLE IF NOT EXISTS docker_kubernetes_payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    payment_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    amount INTEGER NOT NULL, -- Amount in paise (e.g., 299900 for ₹2999)
    currency VARCHAR(3) DEFAULT 'INR',
    razorpay_payment_id VARCHAR(255) UNIQUE NOT NULL,
    razorpay_order_id VARCHAR(255),
    promo_code VARCHAR(50),
    product_type VARCHAR(100) DEFAULT 'docker_kubernetes_bootcamp',
    status VARCHAR(50) DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_docker_kubernetes_payments_email ON docker_kubernetes_payments(email);
CREATE INDEX IF NOT EXISTS idx_docker_kubernetes_payments_razorpay_payment_id ON docker_kubernetes_payments(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_docker_kubernetes_payments_payment_date ON docker_kubernetes_payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_docker_kubernetes_payments_product_type ON docker_kubernetes_payments(product_type);

-- Add comments for documentation
COMMENT ON TABLE docker_kubernetes_payments IS 'Stores payment records for Docker & Kubernetes bootcamp';
COMMENT ON COLUMN docker_kubernetes_payments.amount IS 'Payment amount in paise (e.g., 299900 for ₹2999)';
COMMENT ON COLUMN docker_kubernetes_payments.razorpay_payment_id IS 'Unique Razorpay payment ID';
COMMENT ON COLUMN docker_kubernetes_payments.promo_code IS 'Applied promo code (e.g., KUBEDEAL)';
COMMENT ON COLUMN docker_kubernetes_payments.product_type IS 'Type of product purchased (docker_kubernetes_bootcamp)';
