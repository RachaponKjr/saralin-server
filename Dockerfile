# ใช้ base image ของ Debian (หรือ image ที่รองรับ OpenSSL)
FROM debian:bullseye-slim

# ติดตั้ง dependencies ที่จำเป็น รวมถึง OpenSSL
RUN apt-get update && apt-get install -y \
    curl \
    wget \
    build-essential \
    openssl \
    libssl-dev \
    && apt-get clean

# ติดตั้ง Bun
RUN curl -fsSL https://bun.sh/install | bash

# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอกไฟล์โปรเจกต์
COPY . .

# ติดตั้ง dependencies ด้วย Bun
RUN /root/.bun/bin/bun install

# รันแอปพลิเคชันด้วย Bun
CMD ["/root/.bun/bin/bun", "start"]
