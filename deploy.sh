# Deploy On AWS Ubuntu 18.04 Using NGINX

#!/bin/bash

# Update system packages
sudo apt update
sudo apt upgrade -y

# Install Node.js and npm
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install NGINX
sudo apt install -y nginx

# Install MySQL client
sudo apt install -y mysql-client

# Create app directory
sudo mkdir -p /var/www/ecom
sudo chown -R $USER:$USER /var/www/ecom

# Clone and setup application
cd /var/www/ecom
git clone https://github.com/deepanik/ecom.git .
npm install
npm run build

# Configure NGINX
sudo tee /etc/nginx/sites-available/ecom << EOF
server {
    listen 80;
    34.238.254.227;

    location / {
        root /var/www/ecom/dist;
        try_files \$uri \$uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOF

# Enable site and restart NGINX
sudo ln -s /etc/nginx/sites-available/ecom /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# Setup PM2 for Node.js process management
sudo npm install -g pm2
pm2 start src/server.js --name ecom-server
pm2 startup
pm2 save

# Configure firewall
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw enable

echo "Deployment complete! Configure your domain DNS to point to this server."