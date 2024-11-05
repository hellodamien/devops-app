FROM nginx:1.27.2-alpine

# Copy the dist directory
COPY dist /usr/share/nginx/html