control 'sshd-8' do
  impact 0.6

  title 'Server: Configure the service port'

  desc '
   Always specify which port the SSH server should listen to.
   Prevent unexpected settings.
  '

  tag 'ssh','sshd','openssh-server'
  tag cce: 'CCE-27072-8'

  ref 'NSA-RH6-STIG - Section 3.5.2.1', url: 'https://www.nsa.gov/ia/_files/os/redhat/rhel5-guide-i731.pdf'

  describe sshd_config do
   its('Port') { should eq('22') }
  end
end