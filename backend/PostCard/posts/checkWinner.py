def checkWinner(user_info,challenge):
    if challenge.type == "daily": 
        if challenge.postsNeeded == 0 and challenge.savesNeeded == user_info.postsSavedToday:
                user_info.coins += challenge.coinsRewarded
        else:
            if challenge.postsNeeded == user_info.postsMadeToday:
                user_info.coins+= challenge.coinsRewarded
    
    elif challenge.type == "milestone":
        if challenge.savesNeeded == 0:
            if challenge.postsNeeded == user_info.postsMade:   
                user_info.coins += challenge.coinsRewarded
        else:
            if challenge.savesNeeded == user_info.postsSaved:
                user_info.coins += challenge.coinsRewarded

    user_info.save()     