const dev = {
  STRIPE_KEY: "pk_test_51HDwMDFoNtKcJmgGLF0J7WUXcIrPD3prdIF7e5l7ABhKG8y6SKkdLiLOqbHiwEmQm3ke70oZeXNp9StuDKbFCV4Q004f1QMQnP",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-xpd4e5n6rgj2"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://4xl8g72htc.execute-api.eu-central-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_wc6njnKfU",
    APP_CLIENT_ID: "6f6ig9cd2co1qielbrlsbq46fm",
    IDENTITY_POOL_ID: "eu-central-1:ff8cd120-16b2-4998-9264-df02e4180abb"
  }
};

const prod = {
  STRIPE_KEY: "pk_test_51HDwMDFoNtKcJmgGLF0J7WUXcIrPD3prdIF7e5l7ABhKG8y6SKkdLiLOqbHiwEmQm3ke70oZeXNp9StuDKbFCV4Q004f1QMQnP",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-1ntaoqwr9ik9y"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://90xbti2sk5.execute-api.eu-central-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_AMHMjWPSd",
    APP_CLIENT_ID: "6cn4ub2gcrv9ak6octdve2hqg4",
    IDENTITY_POOL_ID: "eu-central-1:f94df701-5aa3-4c24-99be-7003a319401c"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
