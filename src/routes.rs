use rocket::http::{Cookies, RawStr};

// ----------------------------------------------------------------------------

#[get("/")]
pub fn index_cookies(cookies: Cookies) -> &'static str {
	let class = cookies.get("class");
	unimplemented!();
}
#[get("/", rank=2)]
pub fn index_no_cookies() -> &'static str {
	unimplemented!();
}

// ----------------------------------------------------------------------------

#[get("/news")]
pub fn list_aticles_cookies(cookies: Cookies) -> &'static str {
	let class = cookies.get("class");
	unimplemented!();
}
#[get("/news", rank=2)]
pub fn list_aticles_no_cookies() -> &'static str {
	unimplemented!();
}

// ----------------------------------------------------------------------------

#[get("/schedule")]
pub fn schedule_cookies(cookies: Cookies) -> &'static str {
	let class = cookies.get("class");
	unimplemented!();
}
#[get("/schedule", rank=2)]
pub fn schedule_no_cookies() -> &'static str {
	unimplemented!();
}
#[get("/schedule/<class>")]
pub fn schedule(class: &RawStr) -> &'static str {
	unimplemented!();
}

// ----------------------------------------------------------------------------

#[get("/newcommers")]
pub fn newcommers() -> &'static str {
	unimplemented!();
}

#[get("/about")]
pub fn about() -> &'static str {
	unimplemented!();
}

#[get("/about/<category>")]
pub fn about_category(category: &RawStr) -> &'static str {
	unimplemented!();
}

/*
/	#[get("/about/history")]
/	pub fn history() -> &'static str {
/		unimplemented!();
/	}
/
/	#[get("/about/certificates")]
/	pub fn certificates() -> &'static str {
/		unimplemented!();
/	}
/
/	#[get("/about/teachers")]
/	pub fn teachers() -> &'static str {
/		unimplemented!();
/	}
/
/	#[get("/about/library")]
/	pub fn library() -> &'static str {
/		unimplemented!();
/	}
/
/	#[get("/about/activities")]
/	pub fn activities() -> &'static str {
/		unimplemented!();
/	}
/
/	#[get("/about/documents")]
/	pub fn documents() -> &'static str {
/		unimplemented!();
/	}
*/
