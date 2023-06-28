# A very simple SmartContract that will keep track of the XTZs sent to it

import smartpy as sp


@sp.module
def main():
    params_type: type = sp.record(adminAddress=sp.address)

    class CharityContract(sp.Contract):
        def __init__(self):
            self.data.title = ""
            self.data.admin = sp.address("")
            self.data.target = sp.tez(0)
            self.data.donations = {}
            self.data.total_fund = sp.tez(0)
            self.data.timestamp = sp.now
            self.data.charity = sp.address("")

        @sp.entrypoint
        def donate(self):
            assert sp.amount > sp.tez(0)
            self.data.total_fund += sp.amount

            self.data.donations[sp.sender] = sp.amount

            if self.data.total_fund >= self.data.target:
                sp.send(self.data.charity, self.data.total_fund)

        @sp.entrypoint
        def setAdmin(self, admin):
            # Immediately call this entrypoint after SmartContract deployment to gain
            # administrator access to the SmartContract
            assert self.data.admin == sp.address("")
            self.data.admin = admin

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

    # Test address
    admin = sp.test_account("admin")
    alice = sp.test_account("alice")
    charity = sp.test_account("charity")

    # Create contract
    contract = main.CharityContract()
    scenario += contract

    # change_num_values
    scenario.h2("CharityContract Test1")
    contract.setAdmin(admin.address)
    contract.setFields(
        title="Team Ehsas Charity",
        target=sp.tez(5000),
        timestamp=sp.now,
        charity=charity.address,
    ).run(sender=admin)
    contract.donate().run(sender=alice, amount=sp.tez(15))
