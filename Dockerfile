# Stage 1: Serve the built app using Nginx
FROM nginx:stable-alpine3.20-slim

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy your custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy website files to the container
COPY ./dist /usr/share/nginx/html

# Set port environment variable
ENV PORT=8080

# Expose the port that the application will run on
EXPOSE 8080

# Start the application when the container is run
CMD ["nginx", "-g", "daemon off;"]