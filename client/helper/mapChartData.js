function mapChartData(data) {
  console.log(data);
  const metricsObj = {
    retained_bytes: {
      colDescription: "Topics in Cluster",
      totalDescription: "Total number of bytes retained by server: "
    },
    sent_bytes: {
      colDescription: "Bytes sent by server",
      totalDescription: "Total number of bytes sent by server: "
    },
    received_records: {
      colDescription: "Records received by server",
      totalDescription: "Total number of records received by server: "
    },
    sent_records: {
      colDescription: "Records sent by server",
      totalDescription: "Records sent by server: "
    },
    request_bytes: {
      colDescription: "Bytes requested from server",
      totalDescription: "Bytes requested from server: "
    },
    response_bytes: {
      colDescription: "Bytes responded by server",
      totalDescription: "Total number of bytes responded by server: "
    },
    request_count: {
      colDescription: "Number of request made to server",
      totalDescription: "Total number of request made to server: "
    }
  };

  Object.keys(metricsObj).forEach((key) => {
    const labels = data[key].metrics.map(
      (metric) => metric.type || metric.topic
    );
    const dataset = {};
    dataset.label = key.split("_").at(-1);
    dataset.data = data[key].metrics.map((metric) => metric.value);
    dataset.backgroundColor = "rgba(113, 165, 246, 0.5)";
    dataset.borderWidth = 1;
    metricsObj[key].totalValue = data[key].totalValue;

    metricsObj[key].info = {
      labels,
      datasets: [dataset]
    };
  });

  const newColor = { backgroundColor: "rgba(250, 73, 112, 0.5)" };

  metricsObj["req_res"] = {
    colDescription: "Server request and response bytes",
    totalDescription1: "Total number of request bytes: ",
    totalDescription2: "Total number of response bytes: ",
    totalValue1: metricsObj.request_bytes.totalValue,
    totalValue2: metricsObj.response_bytes.totalValue,
    info: {
      labels: metricsObj.request_bytes.info.labels,
      datasets: [
        metricsObj.request_bytes.info.datasets[0],
        Object.assign({}, metricsObj.response_bytes.info.datasets[0], newColor)
      ]
    },
    compositeChart: true
  };

  console.log(metricsObj);

  return metricsObj;
}

export default mapChartData;
