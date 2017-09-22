/// Retrieve the user's ID, if any.
#[get("/login")]
fn user_id(cookies: Cookies) -> Option<String> {
    cookies.get_private("user_id")
        .map(|cookie| cookie.value)
        unimplemented!
}
/// Remove the `user_id` cookie.
#[post("/logout")]
fn logout(mut cookies: Cookies) -> Flash<Redirect> {
    cookies.remove_private(Cookie::named("user_id"));
    Flash::success(Redirect::to("/"), "Successfully logged out.")
}


#[get("/posts"]
pub fn list_aticles() -> &'static str {
	unimplemented!
}
#[post("/posts/new/"]
pub fn new_aticle() -> &'static str {
	unimplemented!
}
#[post("/posts/edit/", format="application/json", data="<post_id>")]
pub fn edit_article(id: Json<post_id>) -> &'static str {
	unimplemented!
}
#[post("/posts/remove/", format="application/json", data="<post_id>")]
pub fn remove_article(id: Json<post_id>) -> &'static str {
	unimplemented!
}
