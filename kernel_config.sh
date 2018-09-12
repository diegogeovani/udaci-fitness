#! /bin/bash
sudo sysctl -w kern.maxfiles=5242880                                                               
sudo sysctl -w kern.maxfilesperproc=524288