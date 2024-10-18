document.getElementById('home-link').addEventListener('click', function() {
    showContent('home-content');
});

document.getElementById('profile-link').addEventListener('click', function() {
    showContent('profile-content');
});

document.getElementById('settings-link').addEventListener('click', function() {
    showContent('settings-content');
});

function showContent(contentId) {
    var contents = document.getElementsByClassName('content');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('active');
    }
    document.getElementById(contentId).classList.add('active');
}
