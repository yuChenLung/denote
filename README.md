# DENOTE

# Inspiration
Inspired by our care for our loved ones and recent research that suggested that handwriting can detect early signs of Alzheimer's Disease, we created an app that would analyze the cognitive ability of someone through their written text, making use of Google's recently released Gemini 1.5 pro.

# What it does
Denote is a mobile platform that increases the accessibility of motor/cognition tests that can be used to help detect signs of cognitive disorders. Through the app, a user can take memory, drawing, and writing tests. The tests are designed to evaluate users’ short-term memory including recalling the contents of an image and drawing an image based on a prompt. Their motor functionality is tested through the Parkinson’s spiral test. Finally, the writing habits are tested through writing tests.

Artificial intelligence is used to streamline all of these tests and to perform analysis. Dall-E 3 was used to generate images, Google Gemini is used to judge the recollection of the image, the accuracy of the drawing, and to perform lexical and syntactical analysis of users’ writing. A custom trained Convolutional Neural Network is used to detect signs of Parkinson’s in the spirals.

This type of platform can be assigned to users by doctors or professionals to initiate a monitoring process. Users, alongside their caretakers and doctors can quantitatively track the richness and readability of their writing displayed through

# How we built it
The mobile app was built using React Native for the frontend and Google Firebase for the backend and database.

We used Google Gemini to analyze and process large amounts of data, taking advantage of Gemini 1.5’s 1 million token limit to add context to our queries to factor in real medical information and documents to its analyses. Gemini 1.5’s vision capabilities allowed us to extract text from images, allowing for multimodal methods for users to submit their writing.

To detect and differentiate between spirals drawn by a healthy user compared to a user suffering from Parkinson’s, we trained a Convolution Neural Network with spiral and wave image data. We performed data augmentation on this dataset by Zham et al. The structure of the model

# Challenges we ran into
Because detecting early signs of Alzheimer's Disease using handwriting is relatively new, finding labeled datasets of handwritten text is hard to find. However, we were able to create models that could confidently classify handwritten text by looking at the drawing of spirals and waves. We also used NLP to analyze the syntax in a given text to provide a visual representation of the readability and richness of a given text. These metrics would provide evidence for whether a patient is showing signs of cognitive disorder or not. Additionally, this app can be used to collect data to further research in this field, to develop more accurate and reliable models and evaluations.

# Accomplishments that we're proud of
One of the accomplishments that we are most proud of is the high accuracy of our model on predicting if a spiral was drawn by someone suffering from Alzheimer's Disease – achieving a testing accuracy of 85%. We are especially proud of this due to the limited training set available, needing to perform data augmentation to produce more robust training sets. This achievement not only showcases our model's capability but also underscores the potential impact on early diagnostic procedures for Alzheimer's Disease, providing a vital tool for healthcare professionals. By leveraging advanced machine learning techniques, we have significantly improved the reliability of detecting subtle changes in motor skills associated with the disease.

Another accomplishment we are proud of is creating a system to score the strength of a person's memory in a fast, fluid, and unbiased manner. Traditional memory tests are either too simple (requiring a person to repeat a series of words), too labor intensive (requiring hand labeling of images to see how much detail a person can recall and then hand comparing), or too subjective (a human judge has to determine whether or not a description matches the image). Our system leverages DALLE3 to create detailed images and prompts, one of them is fed to the user. The user then tries to remember either the image by describing it in text, or remember the prompt by submitting a crude drawing. Our system alleviates the laborious task of scoring it by using Gemini to output an integer score showing how close the user’s output was to the original prompt/image. We also limit bias, since some human judges may miss things outside their background (i.e an American not knowing aubergine means eggplant). Furthermore, our system is scalable to become more complex – by using more advanced prompts and busy images, or less complex depending on the specific patient and testing environment needed.

# What we learned
During the hackathon, we faced several challenges while working on projects related to detecting Alzheimer's and Parkinson's diseases. One major hurdle was the scarcity of data, which is crucial for training our models effectively. Additionally, we utilized the Gemini API and prompt engineering techniques, which, while innovative, presented their own set of complexities. Another significant challenge involved hosting scripts for end-to-end solutions; this required extensive networking capabilities, especially when the API did not function as expected. These issues required us to adapt and find creative solutions to continue our work effectively.

A lot about Alzheimer’s disease and Parkinisons and general assignments to detect it Data is hard to find Using Gemini API and prompt engineering techniques Hosting scripts though end to end requires a lot of networking if api does not work …

# What's next for Denote
To further develop Denote, we would provide an interface for caregivers alerting patients to use the app. We would create family groups so loved ones can monitor each other's well being and health. A possible direction that this app can take is detecting emotions within words and tracking mental health of individuals over time speech, tackling another serious problem that could use more solutions.

# How to set up

`npx expo install react-dom react-native-web @expo/metro-runtime`

`npx expo install expo-image-picker`

`npx expo install expo-file-system`
