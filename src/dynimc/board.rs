#[post("/posts/new", format="application/json", data="<post>")]
pub fn new_aticle(post: Json<post_id>) -> &'static str {
	unimplemented!();
}
#[post("/posts/edit", format="application/json", data="<post_id>")]
pub fn edit_article(id: Json<post_id>) -> &'static str {
	unimplemented!();
}
#[post("/posts/remove", format="application/json", data="<post_id>")]
pub fn remove_article(id: Json<post_id>) -> &'static str {
	unimplemented!();
}

