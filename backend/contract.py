# A very simple SmartContract that will keep track of the XTZs sent into it and the addresses of
# the people who have sent them

import smartpy as sp


@sp.module
def main():
    class MySimpleContract(sp.Contract):
        def __init__(self):
            self.data.fund = sp.tez(0)
            self.data.addressesAndAmts = {}

        @sp.entrypoint
        def sendAmount(self):
            assert sp.amount > sp.tez(0)
            self.data.fund += sp.amount
            self.data.addressesAndAmts[sp.sender] = sp.amount


@sp.add_test(name="test")
def test():
    scenario = sp.test_scenario()
    scenario.add_module(main)

    # Test address
    alice = sp.test_account("alice")

    # Create contract
    contract = main.MySimpleContract()
    scenario += contract

    # change_num_values
    scenario.h2("MySimpleContract Test1")
    contract.sendAmount().run(amount=sp.tez(15), sender=alice)
