require "vcr"

VCR.configure do |c|
  c.cassette_library_dir = "spec/vcr"
  c.hook_into :webmock
  vcr_mode = :once
  c.debug_logger = false
end
