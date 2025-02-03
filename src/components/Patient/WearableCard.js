

// import React, { useEffect, useState } from "react";
// import { gapi } from "gapi-script";

// const GoogleFitSync = () => {
//   const CLIENT_ID = "619313195773-jsepvp56i0lnn1gvt4o1svpregl1ru1f.apps.googleusercontent.com";
//   const API_KEY = "AIzaSyA0qQivkotCG1iVRRhNQUFzJ24WVwmA8ZU";
//   const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read";

//   const [dataSources, setDataSources] = useState([]);
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
//         fetchGoogleFitData();
//       })
//       .catch((err) => {
//         console.error("Authentication failed: ", err);
//         setError(err.error);
//       });
//   };

//   const fetchGoogleFitData = () => {
//     gapi.client.fitness.users.dataSources
//       .list({ userId: "me" })
//       .then((response) => {
//         console.log("Data Sources: ", response.result);
//         if (response.result.dataSource) {
//           setDataSources(response.result.dataSource);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching data: ", error);
//         setError(error.message);
//       });
//   };

//   return (
//     <div>
//       <h1>Google Fit Data</h1>
//       <button onClick={handleAuth}>Sync Google Fit Data</button>
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       {dataSources.length > 0 && (
//         <div>
//           <h2>Data Sources:</h2>
//           <ul>
//             {dataSources.map((source) => (
//               <li key={source.dataStreamId}>
//                 <strong>{source.dataStreamName}</strong> ({source.dataType.name})
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GoogleFitSync;


import React, { useEffect, useState } from "react";
import { gapi } from "gapi-script";
import { Bar, Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const GoogleFitSync = () => {
  const CLIENT_ID = "619313195773-jsepvp56i0lnn1gvt4o1svpregl1ru1f.apps.googleusercontent.com";
  const API_KEY = "AIzaSyA0qQivkotCG1iVRRhNQUFzJ24WVwmA8ZU";
  const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.body.read";

  const [stepsData, setStepsData] = useState([]);
  const [heartRateData, setHeartRateData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    function start() {
      gapi.client
        .init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          scope: SCOPES,
          discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest"],
        })
        .then(() => {
          console.log("Google API initialized and ready");
        })
        .catch((err) => {
          console.error("Error initializing Google API: ", err);
          setError(err.message);
        });
    }

    gapi.load("client:auth2", start);
  }, []);

  const handleAuth = () => {
    const GoogleAuth = gapi.auth2.getAuthInstance();
    GoogleAuth.signIn()
      .then(() => {
        listDataSources(); // First list available data sources
        fetchStepsData();
        fetchHeartRateData();
      })
      .catch((err) => {
        console.error("Authentication failed: ", err);
        setError(err.error);
      });
  };

  // New function to list data sources for debugging
  const listDataSources = () => {
    gapi.client.fitness.users.dataSources.list({ userId: "me" })
      .then((response) => {
        console.log("All Available Data Sources:", response.result);
      })
      .catch((error) => {
        console.error("Error listing data sources:", error);
      });
  };

  const fetchStepsData = () => {
    const endTime = new Date();
    const startTime = new Date();
    startTime.setDate(endTime.getDate() - 7);

    gapi.client.fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [{
          dataTypeName: "com.google.step_count.delta",
          // Using Noise Fit specific data source from your list
          dataSourceId: "raw:com.google.step_count.delta:noise:noise_activity - step count"
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime.getTime(),
        endTimeMillis: endTime.getTime()
      }
    })
    .then((response) => {
      console.log("Steps Response:", response);
      const steps = response.result.bucket?.map((bucket) => ({
        date: new Date(parseInt(bucket.startTimeMillis)).toLocaleDateString(),
        steps: bucket.dataset?.[0]?.point?.[0]?.value?.[0]?.intVal || 0
      })) || [];
      setStepsData(steps);
    })
    .catch((error) => {
      console.error("Steps Error Details:", error.result);
      setError(error.result?.error?.message || "Failed to fetch steps");
    });
  };

  const fetchHeartRateData = () => {
    const endTime = new Date();
    const startTime = new Date();
    startTime.setDate(endTime.getDate() - 7);

    gapi.client.fitness.users.dataset.aggregate({
      userId: "me",
      requestBody: {
        aggregateBy: [{
          dataTypeName: "com.google.heart_rate.bpm",
          // Using merged data source from Google Fit
          dataSourceId: "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm"
        }],
        bucketByTime: { durationMillis: 86400000 },
        startTimeMillis: startTime.getTime(),
        endTimeMillis: endTime.getTime()
      }
    })
    .then((response) => {
      console.log("Heart Rate Response:", response);
      const heartRate = response.result.bucket?.map((bucket) => ({
        date: new Date(parseInt(bucket.startTimeMillis)).toLocaleDateString(),
        bpm: bucket.dataset?.[0]?.point?.[0]?.value?.[0]?.fpVal || 0
      })) || [];
      setHeartRateData(heartRate);
    })
    .catch((error) => {
      console.error("Heart Rate Error Details:", error.result);
      setError(error.result?.error?.message || "Failed to fetch heart rate");
    });
  };

  // Chart configurations
  const stepsChartData = {
    labels: stepsData.map(d => d.date),
    datasets: [{
      label: 'Steps',
      data: stepsData.map(d => d.steps),
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
  };

  const heartRateChartData = {
    labels: heartRateData.map(d => d.date),
    datasets: [{
      label: 'Heart Rate (BPM)',
      data: heartRateData.map(d => d.bpm),
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Google Fit & Noise Fit Data</h1>
      <button 
        onClick={handleAuth}
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          backgroundColor: '#4285f4',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Connect to Google Fit
      </button>

      {error && (
        <div style={{ color: 'red', marginTop: 20 }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {stepsData.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2>Step Count (Last 7 Days)</h2>
          <div style={{ maxWidth: 800 }}>
            <Bar
              data={stepsChartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                    title: { display: true, text: 'Steps' }
                  }
                }
              }}
            />
          </div>
        </div>
      )}

      {heartRateData.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <h2>Heart Rate (Last 7 Days)</h2>
          <div style={{ maxWidth: 800 }}>
            <Line
              data={heartRateChartData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: false,
                    title: { display: true, text: 'BPM' }
                  }
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleFitSync;