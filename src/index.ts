import Database from 'better-sqlite3';

export default function run() {
	const db = new Database('deck.db', { verbose: console.log });
	const sql = `
CREATE TABLE col (
	id              integer PRIMARY KEY,
		-- arbitrary number since there is only one row
	crt             integer not null,
		-- timestamp of the creation date in second. It's correct up to the day. For V1 scheduler, the hour corresponds to starting a new day. By default, new day is 4.
	mod             integer not null,
		-- last modified in milliseconds
	scm             integer not null,
		-- schema mod time: time when "schema" was modified. 
		--   If server scm is different from the client scm a full-sync is required
	ver             integer not null,
		-- version
	dty             integer not null,
		-- dirty: unused, set to 0
	usn             integer not null,
		-- update sequence number: used for finding diffs when syncing. 
		--   See usn in cards table for more details.
	ls              integer not null,
		-- "last sync time"
	conf            text not null,
		-- json object containing configuration options that are synced. Described below in "configuration JSONObjects"
	models          text not null,
		-- json object of json object(s) representing the models (aka Note types) 
		-- keys of this object are strings containing integers: "creation time in epoch milliseconds" of the models
		-- values of this object are other json objects of the form described below in "Models JSONObjects"
	decks           text not null,
		-- json object of json object(s) representing the deck(s)
		-- keys of this object are strings containing integers: "deck creation time in epoch milliseconds" for most decks, "1" for the default deck
		-- values of this object are other json objects of the form described below in "Decks JSONObjects"
	dconf           text not null,
		-- json object of json object(s) representing the options group(s) for decks
		-- keys of this object are strings containing integers: "options group creation time in epoch milliseconds" for most groups, "1" for the default option group
		-- values of this object are other json objects of the form described below in "DConf JSONObjects"
	tags            text not null
		-- a cache of tags used in the collection (This list is displayed in the browser. Potentially at other place)
);`;
	db.exec(sql);
	db.close();
}