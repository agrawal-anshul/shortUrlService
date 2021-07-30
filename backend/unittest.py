try:
    from app import app
    import unittest

except Exception as e:
    print("An exception occured {}".format(e))

class FlaskTest(unittest.TestCase):
   
   # Check if response is 200
   def test_create(self):
       tester = app.test_client(self)
       response = tester.get("/create")
       statuscode = response.status_code
       self.assertEqual(statuscode, 200)
       self.assertEqual(response.content_type, "application/json")

   def test_fetch(self):
       tester = app.test_client(self)
       response = tester.get("/fetch")
       statuscode = response.status_code
       self.assertEqual(statuscode, 200)
       self.assertEqual(response.content_type, "application/json")

   def test_delete(self):
       tester = app.test_client(self)
       response = tester.get("/delete")
       statuscode = response.status_code
       self.assertEqual(statuscode, 200)

   def test_login(self):
       tester = app.test_client(self)
       response = tester.get("/login")
       statuscode = response.status_code
       self.assertEqual(statuscode, 200)
       self.assertEqual(response.content_type, "application/json")

if __name__ == "_main_":
    unittest.main()
    