/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { gapi } from "gapi-script";
// import { Bar, Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// Chart.register(...registerables);

// const GoogleFitSync = () => {
//   const CLIENT_ID = "619313195773-jsepvp56i0lnn1gvt4o1svpregl1ru1f.apps.googleusercontent.com";
//   const API_KEY = "AIzaSyA0qQivkotCG1iVRRhNQUFzJ24WVwmA8ZU";
//   const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read";

//   const [stepsData, setStepsData] = useState([]);
//   const [heartRateData, setHeartRateData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     function start() {
//       gapi.client
//         .init({
//           apiKey: API_KEY,
//           clientId: CLIENT_ID,
//           scope: SCOPES,
//           discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest"],
//         })
//         .then(() => {
//           console.log("Google API initialized and ready");
//         })
//         .catch((err) => {
//           console.error("Error initializing Google API: ", err);
//           setError(err.message);
//         });
//     }

//     gapi.load("client:auth2", start);
//   }, []);

//   const handleAuth = () => {
//     const GoogleAuth = gapi.auth2.getAuthInstance();
//     GoogleAuth.signIn()
//       .then(() => {
//         listDataSources(); // First list available data sources
//         fetchStepsData();
//         fetchHeartRateData();
//       })
//       .catch((err) => {
//         console.error("Authentication failed: ", err);
//         setError(err.error);
//       });
//   };

//   // New function to list data sources for debugging
//   const listDataSources = () => {
//     gapi.client.fitness.users.dataSources.list({ userId: "me" })
//       .then((response) => {
//         console.log("All Available Data Sources:", response.result);
//       })
//       .catch((error) => {
//         console.error("Error listing data sources:", error);
//       });
//   };

//   const fetchStepsData = () => {
//     const endTime = new Date();
//     const startTime = new Date();
//     startTime.setDate(endTime.getDate() - 7);

//     gapi.client.fitness.users.dataset.aggregate({
//       userId: "me",
//       requestBody: {
//         aggregateBy: [{
//           dataTypeName: "com.google.step_count.delta",
//           // Using Noise Fit specific data source from your list
//           dataSourceId: "raw:com.google.step_count.delta:noise:noise_activity - step count"
//         }],
//         bucketByTime: { durationMillis: 86400000 },
//         startTimeMillis: startTime.getTime(),
//         endTimeMillis: endTime.getTime()
//       }
//     })
//     .then((response) => {
//       console.log("Steps Response:", response);
//       const steps = response.result.bucket?.map((bucket) => ({
//         date: new Date(parseInt(bucket.startTimeMillis)).toLocaleDateString(),
//         steps: bucket.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0
//       })) || [];
//       setStepsData(steps);
//     })
//     .catch((error) => {
//       console.error("Steps Error Details:", error.result);
//       setError(error.result?.error?.message || "Failed to fetch steps");
//     });
//   };

//   const fetchHeartRateData = () => {
//     const endTime = new Date();
//     const startTime = new Date();
//     startTime.setDate(endTime.getDate() - 7);

//     gapi.client.fitness.users.dataset.aggregate({
//       userId: "me",
//       requestBody: {
//         aggregateBy: [{
//           dataTypeName: "com.google.heart_rate.bpm",
//           // Using merged data source from Google Fit
//           dataSourceId: "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
//         }],
//         bucketByTime: { durationMillis: 86400000 },
//         startTimeMillis: startTime.getTime(),
//         endTimeMillis: endTime.getTime()
//       }
//     })
//     .then((response) => {
//       console.log("Heart Rate Response:", response);
//       const heartRate = response.result.bucket?.map((bucket) => ({
//         date: new Date(parseInt(bucket.startTimeMillis)).toLocaleDateString(),
//         bpm: bucket.dataset?.[0]?.point?.[0]?.value?.[0]?.fpVal || 0
//       })) || [];
//       setHeartRateData(heartRate);
//     })
//     .catch((error) => {
//       console.error("Heart Rate Error Details:", error.result);
//       setError(error.result?.error?.message || "Failed to fetch heart rate");
//     });
//   };

//   // Chart configurations
//   const stepsChartData = {
//     labels: stepsData.map(d => d.date),
//     datasets: [{
//       label: 'Steps',
//       data: stepsData.map(d => d.steps),
//       backgroundColor: 'rgba(54, 162, 235, 0.2)',
//       borderColor: 'rgba(54, 162, 235, 1)',
//       borderWidth: 1
//     }]
//   };

//   const heartRateChartData = {
//     labels: heartRateData.map(d => d.date),
//     datasets: [{
//       label: 'Heart Rate (BPM)',
//       data: heartRateData.map(d => d.bpm),
//       backgroundColor: 'rgba(255, 99, 132, 0.2)',
//       borderColor: 'rgba(255, 99, 132, 1)',
//       borderWidth: 1
//     }]
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>Google Fit & Noise Fit Data</h1>
//       <button 
//         onClick={handleAuth}
//         style={{
//           padding: '10px 20px',
//           fontSize: '1rem',
//           backgroundColor: '#4285f4',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}
//       >
//         Connect to Google Fit
//       </button>

//       {error && (
//         <div style={{ color: 'red', marginTop: 20 }}>
//           <strong>Error:</strong> {error}
//         </div>
//       )}

//       {stepsData.length > 0 && (
//         <div style={{ marginTop: 30 }}>
//           <h2>Step Count (Last 7 Days)</h2>
//           <div style={{ maxWidth: 800 }}>
//             <Bar
//               data={stepsChartData}
//               options={{
//                 responsive: true,
//                 scales: {
//                   y: {
//                     beginAtZero: true,
//                     title: { display: true, text: 'Steps' }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {heartRateData.length > 0 && (
//         <div style={{ marginTop: 30 }}>
//           <h2>Heart Rate (Last 7 Days)</h2>
//           <div style={{ maxWidth: 800 }}>
//             <Line
//               data={heartRateChartData}
//               options={{
//                 responsive: true,
//                 scales: {
//                   y: {
//                     beginAtZero: false,
//                     title: { display: true, text: 'BPM' }
//                   }
//                 }
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoogleFitSync;




import { useEffect, useState, useCallback } from 'react';
import { FaHeartbeat, FaWalking } from 'react-icons/fa';
import '../../assets/css/wearable.css'; // Create this file for custom styles

const GoogleFitDashboard = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [steps, setSteps] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [calories, setCalories] = useState(0);
  const [activeMinutes, setActiveMinutes] = useState(0);
  const [loading, setLoading] = useState(true);

  // Replace with your Google API client ID and API key
  // const CLIENT_ID = '619313195773-jsepvp56i0lnn1gvt4o1svpregl1ru1f.apps.googleusercontent.com';
  // const API_KEY = 'AIzaSyA0qQivkotCG1iVRRhNQUFzJ24WVwmA8ZU';
  const CLIENT_ID = '688626160432-r61dk2bh3viechh8ikaa8605ush59gof.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyDxByW2GpWT0OKSLifZbiFatBZyG_8QfDE';

  // Function to update sign-in status
  const updateSigninStatus = useCallback(
    (signedIn) => {
      setIsSignedIn(signedIn);
      if (signedIn) fetchFitData();
    },
    [] // No dependencies required
  );

  useEffect(() => {
    const loadGapi = () => {
      if (!window.gapi) {
        console.error("Google API client not loaded.");
        return;
      }

      window.gapi.load('client:auth2', () => {
        window.gapi.client
          .init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            scope: 'https://www.googleapis.com/auth/fitness.activity.read',
          })
          .then(() => {
            const authInstance = window.gapi.auth2?.getAuthInstance();
            if (!authInstance) {
              console.error("Google Auth instance not initialized.");
              return;
            }

            authInstance.isSignedIn.listen(updateSigninStatus);
            updateSigninStatus(authInstance.isSignedIn.get());
          })
          .catch((err) => console.error("Error initializing Google API client:", err));
      });
    };

    if (window.gapi) {
      loadGapi();
    } else {
      console.error("Google API is not available.");
    }
  }, [updateSigninStatus]);

  const handleAuthClick = () => {
    if (window.gapi?.auth2) {
      window.gapi.auth2.getAuthInstance().signIn();
    } else {
      console.error("Google API client is not ready yet.");
    }
  };

  const fetchFitData = async () => {
    try {
      if (!window.gapi?.client?.fitness) {
        console.error("Google Fit API not loaded.");
        return;
      }

      const startTimeMillis = new Date().setHours(0, 0, 0, 0);
      const endTimeMillis = new Date().getTime();

      // Fetch steps
      const stepsResponse = await window.gapi.client.fitness.users.dataset.aggregate({
        userId: 'me',
        requestBody: {
          aggregateBy: [{ dataTypeName: 'com.google.step_count.delta' }],
          bucketByTime: { durationMillis: 86400000 },
          startTimeMillis,
          endTimeMillis,
        },
      });

      const stepsData = stepsResponse.result.bucket[0]?.dataset[0]?.point[0]?.value[0]?.intVal || 0;
      setSteps(stepsData);

      // Fetch heart rate (last measurement)
      const heartRateResponse = await window.gapi.client.fitness.users.dataSources.datasets.get({
        userId: 'me',
        dataSourceId: 'derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm',
        datasetId: `${startTimeMillis}-${endTimeMillis}`,
      });

      const heartRateData = heartRateResponse.result.point;
      if (heartRateData.length > 0) {
        setHeartRate(heartRateData[heartRateData.length - 1].value[0].fpVal || 0);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {!isSignedIn ? (
        <div className="text-center">
          <button 
            onClick={handleAuthClick}
            className="btn btn-primary"
            style={{ backgroundColor: '#2c3e50', borderColor: '#2c3e50' }}
          >
            Sign in with Google
          </button>
        </div>
      ) : (
        <>
          <h1 className="text-center mb-5" style={{ color: '#2c3e50' }}>Fitness Dashboard</h1>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {/* Steps Card */}
              <div className="col">
                <div className="card h-100 shadow" style={{ border: 'none' }}>
                  <div className="card-header" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <FaWalking className="me-2" /> Steps
                  </div>
                  <div className="card-body">
                    <h2 className="card-title" style={{ color: '#6c5ce7' }}>{steps}</h2>
                    <p className="card-text">Today's step count</p>
                  </div>
                </div>
              </div>

              {/* Heart Rate Card */}
              <div className="col">
                <div className="card h-100 shadow" style={{ border: 'none' }}>
                  <div className="card-header" style={{ backgroundColor: '#2c3e50', color: 'white' }}>
                    <FaHeartbeat className="me-2" /> Heart Rate
                  </div>
                  <div className="card-body">
                    <h2 className="card-title" style={{ color: '#6c5ce7' }}>{heartRate}</h2>
                    <p className="card-text">Current heart rate (bpm)</p>
                  </div>
                </div>
              </div>

              {/* Add more cards similarly */}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GoogleFitDashboard;
