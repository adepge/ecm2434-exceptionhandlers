def checkWinner(user_info,challenge):
    if challenge.postsNeeded == 0:
        if challenge.savesNeeded == user_info.postsSavedToday or user_info.postsSaved:
            user_info.coins += challenge.coinsRewarded
    else:
        if challenge.postsNeeded == user_info.postsMadeToday or user_info.postsMade:   
            user_info.coins += challenge.coinsRewarded
            
    user_info.save()     