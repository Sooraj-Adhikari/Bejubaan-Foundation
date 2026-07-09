/**
 * ContactService.js
 * Web3Forms Integration (Hardcoded Access Key)
 */

const WEB3FORMS_API_URL = "https://api.web3forms.com/submit";

// Replace this with your actual Web3Forms Access Key
const WEB3FORMS_ACCESS_KEY = "1c5cda2e-68a4-4e3f-b8a8-2d66e8f8cd12";

/**
 * Submit form data to Web3Forms
 * @param {Object} data
 * @param {string} subject
 * @returns {Promise<Object>}
 */
export async function submitFormToWeb3(
  data,
  subject = "New Website Submission"
) {
  try {
    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      subject,
      from_name: "Bejubaan Ann Seva Foundation",
      ...data,
    };

    const response = await fetch(WEB3FORMS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    // Debug log (optional)
    console.log("Web3Forms Response:", result);

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || "Form submitted successfully.",
      };
    }

    console.error("Web3Forms API Error:", result);

    throw new Error(
      result.message ||
        "Something went wrong while submitting the form."
    );
  } catch (error) {
    console.error("Submission Error:", error);

    if (
      error instanceof TypeError &&
      error.message.toLowerCase().includes("fetch")
    ) {
      throw new Error(
        "Unable to connect to the server. Please check your internet connection and try again."
      );
    }

    throw new Error(
      error.message ||
        "Something went wrong on our side. Please try again in a few minutes."
    );
  }
}