const axios = require("axios");

const ANONYMIZE_ENDPOINT = process.env.ANONYMIZE_ENDPOINT;
const BOTPRESS_ENDPOINT = process.env.BOTPRESS_ENDPOINT;
const BOTPRESS_TOKEN = process.env.BOTPRESS_TOKEN;

exports.handler = async (event) => {
  console.log("Received event:", JSON.stringify(event, null, 2));

  let userId, messageId, conversationId, type, text, payload;

  try {
    const requestBody = JSON.parse(event.body);
    ({ userId, messageId, conversationId, type, text, payload } = requestBody);
    console.log("Parsed request body:", requestBody);
  } catch (parseError) {
    console.error("Error parsing request body:", parseError);
    return {
      statusCode: 400,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Invalid request body" }),
    };
  }

  try {
    console.log("Sending message to anonymize endpoint:", ANONYMIZE_ENDPOINT);
    const anonymizeResponse = await axios.post(ANONYMIZE_ENDPOINT, {
      message: text,
      conversationId,
    });
    console.log("Anonymize response received:", anonymizeResponse.data);

    const { anonymizedText } = anonymizeResponse.data;

    console.log("Sending message to Botpress endpoint:", BOTPRESS_ENDPOINT);
    const botResponse = await axios.post(
      BOTPRESS_ENDPOINT,
      {
        userId,
        messageId,
        conversationId,
        type,
        text: anonymizedText,
        payload,
      },
      { headers: { Authorization: `Bearer ${BOTPRESS_TOKEN}` } }
    );
    console.log("Botpress response received:", botResponse.data);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(botResponse.data),
    };
  } catch (error) {
    console.error("Error processing the message:", error);

    if (error.response) {
      console.error("Response error data:", error.response.data);
      return {
        statusCode: error.response.status,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: error.response.data }),
      };
    }

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
