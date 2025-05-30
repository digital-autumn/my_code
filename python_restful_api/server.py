import asyncio
import sqlite3
import json
import tornado.web
import tornado.escape
import database_manager
from http_status import STATUS_CODES as s
import server_helper as helper

port: int = helper.setPort(3000)
db_manager = database_manager.DatabaseManager()

print(f'Server running on Port: {port}')
print(f'http://localhost:{port}')

class MainHandler(tornado.web.RequestHandler):
   def get(self):
      self.write("<h1>Widget Builder</h1>")

# Recieves widget object from client and 
# stores it in the database
class CreateWidgetHandler(tornado.web.RequestHandler):
   def post(self):
      conn = db_manager.open_conn()
      c = conn.cursor()

      req_body: object = tornado.escape.json_decode(self.request.body)

      if not req_body:
         self.set_status(s.HTTP_STATUS_BAD_REQUEST)
         self.write(helper.bad_request_message())

      [id, name, num_of_parts] = req_body

      data: object = (id, name, num_of_parts,
                      db_manager.date_formatted(), None)

      try:
         c.execute("""INSERT INTO widgets(id, name,
                      num_of_parts, created_date, modified_date)
                      VALUES(?, ?, ?, ?, ?)""", data)

         self.set_status(s.HTTP_STATUS_CREATED)
         self.write('Widget was successfully created')
         conn.commit()

      except sqlite3.Error as e:
         self.set_status(s.HTTP_STATUS_INTERNAL_SERVER_ERROR)
         self.write(f'Error storing widget in the database: {e}')
     
      finally:
         c.close()

# gets a single widget object from database and returns it to the client in
# JSON format
class ReadWidgetHandler(tornado.web.RequestHandler):
   def get(self):
      conn = db_manager.open_conn()
      c = conn.cursor()

      req_body: object = tornado.escape.json_decode(self.request.body)

      if not req_body:
         self.set_status(s.HTTP_STATUS_BAD_REQUEST)
         self.write(helper.bad_request_message())

      id: str = str(req_body['id'])
      data: object = (id,)

      try:
         c.execute("SELECT * FROM widgets WHERE id=?", data)
         converted_to_json: object = json.dumps(c.fetchall())

         if not converted_to_json:
            self.set_status(s.HTTP_STATUS_NOT_FOUND)
            self.write(f'Widget with id: {id} does not exist in database.')

         else:
            self.set_status(s.HTTP_STATUS_OK)
            self.write(converted_to_json)

      except sqlite3.Error as e:
         self.set_status(s.HTTP_STATUS_INTERNAL_SERVER_ERROR)
         self.write(f'Error reading from database: {e}')

      finally:
         c.close()

# updates widget name and num_of_parts
class UpdateWidgetHandler(tornado.web.RequestHandler):
   def put(self):
      conn = db_manager.open_conn()
      c = conn.cursor()

      req_body: object = tornado.escape.json_decode(self.request.body)

      if not req_body:
         self.set_status(s.HTTP_STATUS_BAD_REQUEST)
         self.write(helper.bad_request_message())

      [id, name, num_of_parts] = req_body

      data: object = (name, num_of_parts, db_manager.date_formatted(), id)

      try:
         c.execute("""UPDATE widgets SET name=?, num_of_parts=?,
                      modified_date=? WHERE id=?""", data)
         self.set_status(s.HTTP_STATUS_CREATED)
         self.write('Widget was sucessfully updated')
         conn.commit()

      except sqlite3.Error as e:
         self.set_status(s.HTTP_STATUS_INTERNAL_SERVER_ERROR)
         self.write(f'Error updating database: {e}')

      finally:
         c.close()

# gets a list of widget objects based on num_of_parts and returns them to the
# client
class ListWidgetsHandler(tornado.web.RequestHandler):
   def get(self):
      conn = db_manager.open_conn()
      c = conn.cursor()

      req_body: object = tornado.escape.json_decode(self.request.body)

      if not req_body:
         self.set_status(s.HTTP_STATUS_BAD_REQUEST)
         self.write(helper.bad_request_message())

      num_of_parts: int = int(req_body['num_of_parts'])
      data: object = (num_of_parts,)

      try:
         c.execute("SELECT * FROM widgets WHERE num_of_parts=?", data)
         converted_to_json = json.dumps(c.fetchall())

         if not converted_to_json:
            self.set_status(s.HTTP_STATUS_NOT_FOUND)
            self.write(f'''There are no widgets with {num_of_parts} parts 
                             in the database.''')

         else:
            self.set_status(s.HTTP_STATUS_OK)
            self.write(converted_to_json)

      except sqlite3.Error as e:
         self.set_status(s.HTTP_STATUS_INTERNAL_SERVER_ERROR)
         self.write(f'Could not get a list of widgets: {e}')

      finally:
         c.close()

# deletes widget from database based on id sent from client
class DeleteWidgetHandler(tornado.web.RequestHandler):
   def delete(self):
      conn = db_manager.open_conn()
      c = conn.cursor()

      req_body: object = tornado.escape.json_decode(self.request.body)

      if not req_body:
         self.set_status(s.HTTP_STATUS_BAD_REQUEST)
         self.write(helper.bad_request_message())

      id: str = str(req_body['id'])
      data: object = (id,)

      try:
         c.execute("DELETE FROM widgets WHERE id=?", data)
         self.set_status(s.HTTP_STATUS_OK)
         self.write('Widget was sucessfully deleted')
         conn.commit()

      except sqlite3.Error as e:
         self.set_status(s.HTTP_STATUS_INTERNAL_SERVER_ERROR)
         self.write(f'Error, widget was not successfully deleted: {e}')

      finally:
         c.close()

def make_app():
   return tornado.web.Application([
      (r"/", MainHandler),
      (r"/create_widget", CreateWidgetHandler),
      (r"/get_widget", ReadWidgetHandler),
      (r"/get_list_of_widgets", ListWidgetsHandler),
      (r"/update_widget", UpdateWidgetHandler),
      (r"/delete_widget", DeleteWidgetHandler)
   ])

async def main():
   app = make_app()
   app.listen(port)
   await asyncio.Event().wait()

if __name__ == "__main__":
   asyncio.run(main())

