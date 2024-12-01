# ใช้ base image ที่รองรับ OpenSSL 3.0.x
FROM debian:bullseye-slim

# ติดตั้ง OpenSSL 3.0.x
RUN apt-get update && apt-get install -y \
    openssl \
    libssl-dev \
    && apt-get clean

# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอกไฟล์โปรเจกต์
COPY . .

# ติดตั้ง Bun
RUN curl -fsSL https://bun.sh/install | bash

# ติดตั้ง dependencies
RUN bun install

# รันคำสั่งเริ่มต้นแอป
CMD ["bun", "start"]
