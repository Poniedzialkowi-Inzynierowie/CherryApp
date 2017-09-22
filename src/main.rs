#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;

use mod static;
use mod login;
use mod schedule;

#[get("/")]
pub fn index(cookies: Cookies) -> Option<String> {
    cookies.get("class")
    unimplemented!
}

fn main() {
	rocket::ignite()
	.mount("/", routes![index])
	.mount("/chat", routes![static::chat])
	.mount("/schedule", routes![schedule::main])
	.mount("/schedule/<class>", routes![schedule::class])
	.mount("/newcommers", routes![static::newcomers])

	.mount("/about", routes![static::about::main])
	.mount("/about/history", routes![static::about::history])
	.mount("/about/library", routes![static::about::library])
	.mount("/about/teachers", routes![static::about::teachers])
	.mount("/about/documents", routes![static::about::documents])
	.mount("/about/activities", routes![static::about::activities])
	.mount("/about/certificates", routes![static::about::certificates])
	
	.mount("/login", routes![login::choose])

	.launch();
}
