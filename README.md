# KafkaCompass

Welcome to **KafkaCompass**, a GUI specialized in getting performance and content statistics for your Confluent Cloud Apache Kafka clusters, in addition to giving you tools to interact with and change the content of you clusters. We're excited to have you as a user for our application, and we can't wait to help you navigate and optimize your Kafka clusters!

# Guide

In a coming update, you will be able to run KafkaCompass on a standalone web application! For now, you will need to run the application on your own machine. 

## Getting started

To get started with KafkaCompass, clone this repo to your local machine. Once completed, you will need to add some additional files to your project directory. These steps will help you create your own database and encryption functions so you can take advantage of all of KafkaCompass's backend functionality.

### Configuring Your Repository

- **credentials.js**

  - Under the "server" directory, create a new file called "credentials.js." This file will allow you to connect your NoSQL database (we recommend using MongoDB). If you are not sure how to set up a database on MongoDB, check out their [guide](https://www.mongodb.com/basics/create-database).
  - Following the format on "credentials.js.example," copy and paste the link to your database URI. KafkaCompass is now connected to your database!

- **encryption.js**

  - In order to encrypt and decrypt information from your database, you will need to set up functionality to do so. Using the template on "encryption.js.example," create your own "encryption.js" file.
  - For the security of our own application as well as yours, you will need to implement your own encryption and decryption functions. If you are not sure where to start with this, we recommend looking at some algorithms [here](https://www.labnol.org/code/encrypt-decrypt-javascript-200307).

### Running the application

- Once credentials.js and encryption.js are set up, your application is now good to go! Install all dependencies with "npm install," then use "npm run dev" to run in development mode. Alternatively, use "npm run build" then "npm start" to run in production mode.

## Sign Up and Adding Clusters

- Once installed, make sure you sign up on the landing page, which will appear on the initial loading of the application. Click the "Sign Up" button at the top right of the navbar, fill out the designated fields, and click 'Sign Up'
- Once you’ve signed up, you will be greeted by your dashboard. It’s important to note that KafkaCompass is designed to work with Confluent Cloud Apache Kafka clusters, so to get started viewing Cluster performance statistics and content, you will need to have a Kafka cluster already running in Confluent Cloud. Follow the steps [here](https://docs.confluent.io/cloud/current/get-started/index.html#quick-start-for-ccloud) to set this up.
- Once you have a running cluster, you can now link it to the application. To link your cluster, click on the “Add Cluster” button in the nav-bar at the top of the dashboard. Fill out all the fields, checking carefully for accuracy, and press submit. Your cluster information will now be stored and encrypted in your user profile for use in the app.
  - Having trouble finding some of your cluster information? Here is where each piece of info can be found:
    - **Cluster name**: Up to you! Create an alias to help you remember this specific cluster.
    - **API Key** and **API Secret**: On Confluent Cloud, navigate to your cluster. In the sidebar on the left, click on "API Keys," located under Cluster Overview. If you don't already have an API Key, generate a new one, making sure to securely save your key and secret - the secret will no longer be viewable after creation.
    - **Cloud Key** and **Cloud Secret**: In the top navbar of Confluent Cloud, click the three stacked lines on the right corner. This will open a menu, where you can click "Cloud API keys." Similar to the previous step, if you have not already generated a Cloud Key, create a new one and securely save the key and secret.
    - **REST Endpoint**, **Cluster ID**, and **Bootstrap Server**: Return to your cluster's page on Confluent Cloud. In the sidebar on the left, click "Cluster Settings" under "Cluster Overview." The information will be displayed in the boxes for "Identification" and "Endpoints."

## View Modes

Now that you have a cluster stored in your account, you will be able to see performance and content information for the cluster. KafkaCompass has two primary viewing modes: **Performance Statistics** and **Content Monitoring**.  Additionally, users have access to their **Cluster History**.

### Performance Statistics

- The default mode is Performance Statistics, which initially shows a chart displaying retained bytes per topic in the first cluster of your profile. To switch charts, press the **Select Metrics** button in the navbar, which will open a side menu. In the side menu, you can choose the desired statistic you would like to view. If you would like to update these statistics to the most recent state of your cluster, simply press the **Update Cluster** button on the dashboard.

### Cluster History

- As soon as your metrics have been updated at least once, you will now have multiple snapshots to view in the **Cluster History** page.  To view Cluster History, open the side menu for Select Metrics, and click on "Cluster History" at the bottom of the menu.  This will open a table with a list of your snapshots, organized by timestamp, with a link to each snapshot's metrics.
- To return to your current cluster's statistics, simply navigate to the same side-menu from Select Metrics, and click on "Back to current cluster"

### Content Monitoring

- In Content Monitoring, you can consume and see the current messages in your selected cluster. To view messages, select the desired topic in your cluster via the dropdown menu, located to the left of the chart. Once you have selected a topic, simply click **Consume Messages**, and the most recent messages in the given topic of your cluster will be displayed.
- Additionally, you can change the configuration of your cluster. To add and delete topics, or to add a message to a given topic, simply click on each action’s button, located on the right-hand side of the screen, and fill out their respective forms. In Content Monitoring, you will be able to see these changes nearly instantly. However, it’s worth noting that in “Performance Statistics” mode, it may take around 3-5 minutes for the addition or deletion of topics to show up, due to how Confluent Cloud updates cluster statistics.
- Once you have multiple clusters added to your profile, you can switch between these clusters by using the **Switch Cluster** button, located in the menu at the top-left of the navbar. After clicking on "Switch Cluster, click on the desired cluster in the dropdown menu, and you will now be able to interact with that chosen cluster

# Contributing to KafkaCompass

KafkaCompass is open source, and we would love to see contributions from the community to improve the functioning of the application. If you would like to contribute, submit a pull request to the "dev" branch of the original repository. Additionally if you notice any issues with the application, please add an entry to the "issues" section of the repository.

If you are looking for specific ideas on where to contribute, here are some features we would like to see being added/worked on:

- Visual cluster comparison features 
- Additional performance metrics
- Tests for front and backend functionality
