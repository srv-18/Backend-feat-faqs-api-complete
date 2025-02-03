# For Running Locally

1. Clone the repository:
```bash
git clone https://github.com/srv-18/Backend-feat-faqs-api-complete.git
```

2. Navigate to the project directory:
```bash
cd Backend-feat-faqs-api-complete
```

3. Create a .env file:
```bash
cp .env.example .env
```

4. Install the dependencies:
```bash
npm install
```

5. Start the docker compose:
```bash
docker compose up
```

6. Start the backend locally:
```bash
npm run dev
```

# Usage

1. Access the backend using postman its a admin endpoint:
```bash
POST Request http://localhost:3000/api/faqs
```

2. Pass the body as:
```bash
{
    "question": "Who can open a Fixed Deposit?",
    "answer": "Any Indian citizen who is 18 years old or older and has valid identification documents like a PAN card and Aadhaar can open a Fixed Deposit."
}
```

3. To get all the faqs(for language English):
```bash
GET Request http://localhost:3000/api/faqs/
```

> **Note**
> For Hindi language, make a GET Request:
```bash
GET Request http://localhost:3000/api/faqs/?lang=hi
```

