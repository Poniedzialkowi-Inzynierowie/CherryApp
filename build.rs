//extern crate inotify;

//use inotify::{Inotify, watch_mask, event_mask};
use std::env;

fn main(){
//	let mut inotify = Inotify::init().expect("Failed to initialize inotify");
	let current_dir = env::current_dir().expect("Failed to determine current directory");

	println!("Watching {:?} directory for activity...", current_dir);
}
