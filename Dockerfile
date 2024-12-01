# ใช้ base image ของ Railway
FROM oven/bun:latest

# ติดตั้ง openssl 3.0.x
RUN apt-get update && apt-get install -y openssl=3.0.* libssl-dev

# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอกไฟล์โปรเจกต์
COPY . .

# ติดตั้ง dependencies
RUN bun install

# เริ่มต้นแอปพลิเคชัน
CMD ["bun", "start"]
