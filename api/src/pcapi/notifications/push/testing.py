requests: list[dict | list] = []


def reset_requests() -> None:
    global requests  # pylint: disable=global-statement
    requests = []
