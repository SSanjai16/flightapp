CREATE TABLE IF NOT EXISTS sanjai.pastbookflight (
	id text PRIMARY KEY,
	amount int,
	class text,
	dateofbooking date,
	flightnum int,
	mealpref text,
	name text,
	tickets int,
	userid int,
	validationstatus text)
	WITH ID = 05e236b0-819a-11eb-8964-27d718462e43
	AND bloom_filter_fp_chance = 0.01
	AND dclocal_read_repair_chance = 0.1
	AND crc_check_chance = 1.0
	AND default_time_to_live = 0
	AND gc_grace_seconds = 5
	AND min_index_interval = 128
	AND max_index_interval = 2048
	AND memtable_flush_period_in_ms = 0
	AND read_repair_chance = 0.0
	AND speculative_retry = '99PERCENTILE'
	AND comment = ''
	AND caching = { 'keys': 'ALL', 'rows_per_partition': 'NONE' }
	AND compaction = { 'max_threshold': '32', 'min_threshold': '4', 'class': 'org.apache.cassandra.db.compaction.SizeTieredCompactionStrategy' }
	AND compression = { 'chunk_length_in_kb': '64', 'class': 'org.apache.cassandra.io.compress.LZ4Compressor' }
	AND cdc = false
	AND extensions = {  };
CREATE CUSTOM INDEX IF NOT EXISTS class ON sanjai.pastbookflight (class) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS { 'mode': 'CONTAINS', 'case_sensitive': 'false', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer' };
CREATE CUSTOM INDEX IF NOT EXISTS meals ON sanjai.pastbookflight (mealpref) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS { 'mode': 'CONTAINS', 'case_sensitive': 'false', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer' };
CREATE INDEX IF NOT EXISTS uname ON sanjai.pastbookflight (name);
CREATE CUSTOM INDEX IF NOT EXISTS username ON sanjai.pastbookflight (name) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS { 'mode': 'CONTAINS', 'case_sensitive': 'false', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer' };
CREATE CUSTOM INDEX IF NOT EXISTS validation ON sanjai.pastbookflight (validationstatus) USING 'org.apache.cassandra.index.sasi.SASIIndex' WITH OPTIONS { 'mode': 'CONTAINS', 'case_sensitive': 'false', 'analyzer_class': 'org.apache.cassandra.index.sasi.analyzer.NonTokenizingAnalyzer' };
