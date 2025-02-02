# ใช้ base image ที่รองรับ bun
FROM oven/bun:latest

# ติดตั้ง OpenSSL 3.0.x (หากต้องการ)
RUN apt-get update && apt-get install -y \
    openssl \
    libssl-dev \
    && apt-get clean

# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอกไฟล์โปรเจกต์
COPY . .

# ติดตั้ง dependencies ด้วย bun
RUN bun install

# สั่งให้ Railway ใช้ port 3000 สำหรับการรันแอปพลิเคชัน
EXPOSE 3000

# รันแอปพลิเคชัน
CMD ["bun", "run", "src/index.ts"]
