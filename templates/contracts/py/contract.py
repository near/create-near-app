from near_sdk_py import Contract, view, call, init

class GreetingContract(Contract):
    """
    A simple greeting contract that stores and returns a message.
    """
    
    @init
    def initialize(self, default_message="Hello, NEAR world!"):
        """
        Initialize the contract with a default greeting message.
        """
        self.storage["greeting"] = default_message
        return {"success": True}
    
    @call
    def set_greeting(self, message: str):
        """
        Change the greeting message.
        """
        self.storage["greeting"] = message
        self.log_info(f"Saving greeting: {message}")
        return {"success": True}
    
    @view
    def get_greeting(self):
        """
        Retrieve the current greeting message.
        """
        return self.storage.get("greeting", "Hello, NEAR world!")
        