# ขั้นตอนที่ 1: ใช้ base image สำหรับการติดตั้ง dependencies
FROM oven/bun:latest AS builder

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

# Build แอปพลิเคชัน
RUN bun build

# ขั้นตอนที่ 2: ใช้ base image สำหรับ production (ลดขนาด)
FROM oven/bun:latest

# ตั้งค่าโฟลเดอร์ทำงาน
WORKDIR /app

# คัดลอกไฟล์ที่ต้องการจากขั้นตอน builder (เฉพาะไฟล์ที่จำเป็น)
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/node_modules /app/node_modules

# สั่งให้ Railway ใช้ port 3000 สำหรับการรันแอปพลิเคชัน
EXPOSE 3000

# กำหนดตัวแปรสภาพแวดล้อม (Production)
ENV NODE_ENV=production

# รันแอปพลิเคชันใน production
CMD ["bun", "run", "dist/index.js"]
