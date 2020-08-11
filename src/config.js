export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  STRIPE_KEY: "pk_test_51HDwMDFoNtKcJmgGLF0J7WUXcIrPD3prdIF7e5l7ABhKG8y6SKkdLiLOqbHiwEmQm3ke70oZeXNp9StuDKbFCV4Q004f1QMQnP",
  s3: {
    REGION: "eu-central-1",
    BUCKET: "notes-app-uploads-wlsf82"
  },
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://xhw1ucokn4.execute-api.eu-central-1.amazonaws.com/prod"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_ZVAk98loH",
    APP_CLIENT_ID: "1ldlg0dunmoq431hqg2074184g",
    IDENTITY_POOL_ID: "eu-central-1:e659dd7b-ec40-4414-b754-82a1e7ae8d23"
  }
};
