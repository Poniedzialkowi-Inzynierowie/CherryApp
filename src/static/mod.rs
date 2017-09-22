use rocket::http::Cookies;

use mod about;


#[get("/")]
pub fn newcomers() -> &'static str {
    unimplemented!
}

#[get("/schedule")]
pub fn schedule(coockies: Coockies) -> &'static str {
	cookies.get("class")
	unimplemented!
}
