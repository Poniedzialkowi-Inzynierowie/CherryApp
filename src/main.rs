#![feature(plugin)]
#![plugin(rocket_codegen)]

extern crate rocket;
pub mod routes;

fn main() {
	rocket::ignite()
	.mount("/", routes![
		routes::index_cookies,
		routes::index_no_cookies,
		routes::schedule_cookies,
		routes::schedule_no_cookies,
		routes::newcommers,
		routes::about_category,
		routes::about
	])
	.launch();
}
