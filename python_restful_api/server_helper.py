from collections import namedtuple
# Helper functions for Rest API operations

def bad_request_message()-> str:
   return "No request body was sent"

def setPort(port_num)-> int:
   Port = namedtuple('Port', ['port'])
   PORT_NUM = Port(port_num)
   return PORT_NUM.port
