const remove = (a, reload) => {
    a.preventDefault();
    let run = confirm("Are you sure that you want to delete the book?");
    if (run) {
        window.location.href = reload;
    }
    else {
        "Cant load there is an error"
    }
}