# # encoding: utf-8

# InSpec test for our test role.

# The InSpec reference, with examples and extensive documentation, can be
# found at http://inspec.io/docs/reference/resources.

describe package('nmap') do
  it { should be_installed }
end