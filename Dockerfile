FROM mcr.microsoft.com/playwright:v1.44.0-jammy

WORKDIR /tests

COPY package*.json ./
RUN npm ci

COPY . .

CMD ["sh", "-c", "npx playwright test ${TEST_FILE} --grep ${TEST_NAME}"]