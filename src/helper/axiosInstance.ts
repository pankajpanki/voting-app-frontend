import axios from "axios";
import toast from "react-hot-toast";

const axiosInstance = axios.create({
	//baseURL: "https://api.example.com", // Replace with your API's base URL
	baseURL: process.env.REACT_APP_API_BASE_URL, // Replace with your API's base URL
	timeout: 10000, // Request timeout in milliseconds
	headers: {
		"Content-Type": "application/json",
	},
});

// Request Interceptor
/*axiosInstance.interceptors.request.use(
  (config) => {
    // Add authorization token or other headers if needed
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);*/
// Request Interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		// Add authorization token
		/*const token = localStorage.getItem("authToken");
		if (token) {
		  config.headers.Authorization = `Bearer ${token}`;
		}*/

		// Add a custom header
		//config.headers["X-Custom-Header"] = "MyCustomHeaderValue";

		// Append query parameters
		if (!config.params) {
		  config.params = {};
		}
		//config.params.timestamp = Date.now();

		// Modify the request URL (e.g., add a prefix for API versioning)
		config.url = `/${config.url}`;

		// Modify request data (for POST/PUT requests)
		/*if (config.method === "post" || config.method === "put") {
			config.data = { ...config.data,  additionalField: "extraValue" };
		}*/
		//console.log("Updated Request Config:", config);
		return config;
	},
	(error) => {
		// Handle request errors
		console.error("Request Error:", error);
		return Promise.reject(error);
	}
);

// Response Interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		// Transform or log response if needed
		//return response.data;
		return response;
	},
	(error) => {
		//console.log('error', error)
		if (!error.config._toastShown) {
			error.config._toastShown = true; // Mark toast as shown
			// Handle errors globally
			if (error.response) {
				// Server responded with a status other than 2xx
				const { status, data } = error.response;
				const message = data?.message || "An error occurred!";
				toast.error(`Error ${status}: ${message}`, { duration: 9000, style: { minWidth: '250px' } });
			} else if (error.request) {
				// Request was made but no response was received
				toast.error("No response from the server. Please try again.", { duration: 9000, style: { minWidth: '250px' } });
			} else {
				// Other errors (e.g., setting up request)
				toast.error("An unexpected error occurred.", { duration: 9000, style: { minWidth: '250px' } });
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
