# A very simple SmartContract that will keep track of the XTZs sent into it and the addresses of
# the people who have sent them

import smartpy as sp

@sp.module
def main():
    class CharityContract(sp.Contract):
        def __init__(self):
            self.data.hasSetAdmin = False
            self.data.title = ""
            self.data.admin = sp.self_address()
            self.data.target = sp.tez(0)
            self.data.donations = {}
            self.data.total_fund = sp.tez(0)
            self.data.timestamp = sp.now
            self.data.charity = sp.self_address()
    
        @sp.entrypoint
        def donate(self):
            assert sp.amount > sp.tez(0)
            self.data.total_fund += sp.amount

            if (self.data.donations.contains(sp.sender)):
                self.data.donations[sp.sender] += sp.amount
            else:
                self.data.donations[sp.sender] = sp.amount

            if self.data.total_fund >= self.data.target:
                sp.send(self.data.charity, self.data.total_fund)
                self.data.total_fund = sp.tez(0) # reset fund
                self.data.donations = {} # reset donations data

        @sp.entrypoint
        def setAdmin(self, params):
            # Immediately call this entrypoint after SmartContract deployment to gain
            # administrator access to the SmartContract
            assert not self.data.hasSetAdmin
            self.data.admin = params.new_admin
            self.data.hasSetAdmin = True

        @sp.entrypoint
        def setFields(self, params):
            assert sp.sender == self.data.admin
            self.data.title = params.title
            self.data.target = params.target
            self.data.timestamp = params.timestamp
            self.data.charity = params.charity
    
@sp.add_test(name="test")
def test():
    scenario = sp.test_scenario()
    scenario.add_module(main)

    # Test addresses
    admin = sp.test_account("admin")
    alice = sp.test_account("alice")
    bob = sp.test_account("bob")
    charity = sp.test_account("charity")

    # Create contract
    contract = main.CharityContract()
    scenario += contract

    # Run test code
    scenario.h2("CharityContract Test")
    contract.setAdmin(new_admin=admin.address)
    contract.setFields(title="This is a sample title", target=sp.tez(5000), timestamp=sp.now, charity=charity.address).run(sender=admin)
    contract.donate().run(sender=alice, amount=sp.tez(15))
    contract.donate().run(sender=alice, amount=sp.tez(15))
    contract.donate().run(sender=alice, amount=sp.tez(5000))
    contract.donate().run(sender=bob, amount=sp.tez(5))
            