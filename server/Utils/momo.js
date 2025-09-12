import axios from "axios";
import { v4 as uuid } from "uuid";

export const createApiUser = async () => {
    const referenceId = uuid(); // Use UUID
    const subscriptionKey = "363144d45d114898b0f332624d13bb68";
  
    try {
      const res = await axios.post(
        "https://sandbox.momodeveloper.mtn.com/v1_0/apiuser",
        {
          providerCallbackHost: "https://car-renter-wkl3.onrender.com/momo/notify", // Replace with your domain
        },
        {
          headers: {
            "X-Reference-Id": referenceId,
            "Ocp-Apim-Subscription-Key": subscriptionKey,
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("API User created successfully.");
      console.log("Reference ID (your API User ID):", referenceId);
    } catch (err) {
      console.error("Error creating API user:", err.response?.data || err.message);
    }
  }

  //Create api key

export const generateMomoApiKey = async () => {
  const apiUserId = "00181be6-8609-4a08-a58d-e4b9b76ecf31"; // your API user UUID
  const subscriptionKey = "363144d45d114898b0f332624d13bb68";

  try {
    const response = await axios.post(
      `https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/${apiUserId}/apikey`,
      {}, // No request body needed
      {
        headers: {
          "Ocp-Apim-Subscription-Key": subscriptionKey,
        },
      }
    );

    console.log("✅ API Key generated successfully:");
    console.log("API Key:", response.data.apiKey);
    return response.data.apiKey;
  } catch (error) {
    console.error("❌ Failed to generate API key:");
    console.error(error.response?.data || error.message);
  }
}




  
