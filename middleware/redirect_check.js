export default function (context) {

    if (context.params.userAchievementsMaster == undefined) {
        context.redirect('/')
    }

}