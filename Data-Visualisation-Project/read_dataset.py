# import pandas as pd

# # Read the CSV file into a DataFrame
# file_path = "Tinder_profiles.csv"
# df = pd.read_csv(file_path, low_memory=False)

# # Select the columns for matches, likes, and passes
# selected_columns = ["conversationsMeta.nrOfConversations",
#                     "conversationsMeta.nrOfGhostingsAfterInitialMessage",
#                     "conversationsMeta.nrOfOneMessageConversations",
#                     "conversationsMeta.percentOfOneMessageConversations" 
#                     ]

# # Calculate the average for each column
# #average_values = df[selected_columns].mean()

# # Create a DataFrame with the average values
# conversations_behaviour_df = df[selected_columns]

# # Save the DataFrame to a CSV file
# conversations_behaviour_df.to_csv("conversations_behaviour.csv")

# print("CSV file created successfully with average values.")
import pandas as pd

# # Read the CSV file into a DataFrame
file_path = "Tinder_profiles.csv"
df = pd.read_csv(file_path, low_memory=False)

# # Select the columns for matches, likes, and passes
selected_columns = ["user.gender",
#                     "conversationsMeta.nrOfGhostingsAfterInitialMessage",
#                     "conversationsMeta.nrOfOneMessageConversations",
#                     "conversationsMeta.percentOfOneMessageConversations" 
                    ]

# # Calculate the average for each column
# #average_values = df[selected_columns].mean()

# # Create a DataFrame with the average values
user_gender = df[selected_columns]

# # Save the DataFrame to a CSV file
user_gender.to_csv("user_gender.csv")

print("CSV file created successfully with average values.")