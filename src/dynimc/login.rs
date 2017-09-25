/// Retrieve the user's ID, if any.
#[get("/login")]
pub fn user_id(cookies: Cookies) -> Option<String> {
	cookies.get_private("user_id")
		.map(|cookie| cookie.value);
		unimplemented!();
}
/// Remove the `user_id` cookie.
#[post("/logout")]
pub fn logout(mut cookies: Cookies) -> Flash<Redirect> {
    cookies.remove_private(Cookie::named("user_id"));
    Flash::success(Redirect::to("/"), "Successfully logged out.")
}
