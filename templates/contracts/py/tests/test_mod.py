from near_pytest.testing import NearTestCase
import json

class TestGreetingContract(NearTestCase):
    @classmethod
    def setup_class(cls):
        """Compile and deploy the greeting contract."""
        super().setup_class()
        
        # Compile the contract
        wasm_path = cls.compile_contract(
            "contract.py",
            single_file=True
        )
        
        # Deploy the contract
        cls.contract_account = cls.create_account("contract")
        cls.instance = cls.deploy_contract(cls.contract_account, wasm_path)
        
        # Initialize the contract
        cls.instance.call_as(
            account=cls.contract_account,
            method_name="initialize",
            args={"default_message": "Initial greeting"},
        )
        
        # Create test user
        cls.user = cls.create_account("user")
        
        # Save state for future resets
        cls.save_state()
    
    def setup_method(self):
        """Reset state before each test method."""
        self.reset_state()
        
    def test_greeting(self):
        # Set greeting as user
        result = self.instance.call_as(
            account=self.user,
            method_name="set_greeting",
            args={"message": "Hello from test!"}
        )
        result = json.loads(result.text)
        assert result["success"] == True
        
        # Get greeting
        greeting = self.instance.call_as(
            account=self.user,
            method_name="get_greeting"
        )
        assert greeting.text == "Hello from test!"
        
